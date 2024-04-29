import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PlotDataComponent({ data }) {
    
    function generateColor(index) {
        // Simple hash function to generate color based on index
        let hash = (index * 123456789) & 0xffffff; // Bitwise AND to keep it within 0xffffff
        return `#${hash.toString(16).padStart(6, '0')}`; // Convert to hex and pad with zeros if necessary
    }

    const groupedData = data.reduce((acc, point) => {
        acc[point.Cluster] = acc[point.Cluster] || [];
        acc[point.Cluster].push({ x: point.PCA1, y: point.PCA2 });
        return acc;
    }, {});

    // Now, generate a dataset for each cluster
    const datasets = Object.keys(groupedData).map(cluster => ({
        label: `Cluster ${cluster}`,
        data: groupedData[cluster],
        backgroundColor: generateColor(cluster),
    }));

    // This is the structure that Chart.js expects
    const plotData = {
        datasets
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `Point: ${tooltipItem.parsed.x}, ${tooltipItem.parsed.y}`;
                    }
                }
            }
        }
    };

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            
            <Scatter
                key={data.map(point => point.Cluster).join("-")}
                data={plotData}
                options={options}
            />
        </div>
    );
}

export default PlotDataComponent;
