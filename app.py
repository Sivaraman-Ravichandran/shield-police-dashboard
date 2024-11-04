from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from datetime import datetime
import base64
from io import BytesIO
from PIL import Image

from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# MongoDB setup
client = MongoClient('mongodb+srv://sivcloud12:gesture@cluster0.imbqc.mongodb.net/?retryWrites=true&w=majority')
db = client['sos_alerts_db']
alerts_collection = db['alerts']
sos_collection=db['generate']
# API endpoint to retrieve all SOS alerts (GET method)
@app.route('/getAlerts', methods=['GET'])
def get_sos_alerts():
    try:
        # Retrieve all SOS alerts from MongoDB
        alerts = list(sos_collection.find({}, {'_id': 0}))  # Exclude MongoDB's default _id field

        # Return the alerts in JSON format
        return jsonify(alerts), 200

    except Exception as e:
       return jsonify({'message': f'An error occurred: {str(e)}'}), 500


# Route to serve index.html
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle SOS alert
@app.route('/alert', methods=['POST'])
def alert():
    data = request.json
    if data and data.get('message') == 'SOS':
        # Extract location data from request
        location = data.get('location', {})
        if isinstance(location, dict):
            location_data = {
                "latitude": location.get('latitude', 'Unknown'),
                "longitude": location.get('longitude', 'Unknown'),
                "address": location.get('address', 'Unknown')
            }
        else:
            location_data = {
                "latitude": 'Unknown',
                "longitude": 'Unknown',
                "address": 'Unknown'
            }
        
        # Save the image data
        image_data = data.get('image', '')

        alert_data = {
            "message": data['message'],
            "location": location_data,
            "timestamp": datetime.now().isoformat(),
            "image": image_data
        }
        try:
            alerts_collection.insert_one(alert_data)
            return jsonify({"status": "Alert received"}), 200
        except Exception as e:
            print(f"Error inserting data into MongoDB: {e}")
            return jsonify({"status": "Failed to store alert"}), 500
    else:
        return jsonify({"status": "No alert"}), 400

# Route to display alerts
@app.route('/alerts', methods=['GET'])
def get_alerts():
    try:
        alerts = list(alerts_collection.find({}, {'_id': 0}))
        for alert in alerts:
            if 'image' in alert:
                image_data = alert['image']
                image = Image.open(BytesIO(base64.b64decode(image_data)))
                # Save or process the image as needed
                image.save('received_image.jpg')  # Save image to file
        return jsonify(alerts), 200
    except Exception as e:
        print(f"Error fetching alerts: {e}")
        return jsonify({"status": "Failed to fetch alerts"}), 500

if __name__ == '_main_':
    app.run(port=5000, debug=True)