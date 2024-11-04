import React from 'react';

const GroupsTable = () => {
  return (
    <div className="groups-table">
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Group Name</th>
            <th>Malware Monitoring</th>
            <th>Application Audit</th>
            <th>Vulnerability Assessment</th>
            <th>API Security Audit</th>
            <th>Total</th>
            <th>Seal Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Demo1</td>
            <td>6</td>
            <td>71</td>
            <td>5</td>
            <td>0</td>
            <td>82</td>
            <td>Pass</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Demo2</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>Fail</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GroupsTable;
