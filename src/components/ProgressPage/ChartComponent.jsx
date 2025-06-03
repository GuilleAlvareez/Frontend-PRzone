import React, { useEffect, useRef, useState } from 'react';
import { createChart, AreaSeries, ColorType, LineStyle } from 'lightweight-charts';

// Estilos en línea para los botones (puedes moverlos a un CSS si prefieres)
const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? '#2962FF' : 'transparent',
    color: isActive ? 'white' : '#B2B5BE',
    border: 'none',
    padding: '6px 12px',
    margin: '0 2px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
});

// --- Lógica de generación de datos movida fuera del componente ---
const generateSampleData = (range) => {
    const data = [];
    let baseDate = new Date(); 
    baseDate.setUTCHours(0, 0, 0, 0); 

    let startDate = new Date(baseDate);
    let numPoints;
    let pointIncrementMillis;

    switch (range) {
        case '1D':
            startDate.setUTCDate(startDate.getUTCDate() - 1);
            numPoints = 24 * 4; 
            pointIncrementMillis = 15 * 60 * 1000;
            break;
        case '1W':
            startDate.setUTCDate(startDate.getUTCDate() - 7);
            numPoints = 7 * 24; 
            pointIncrementMillis = 60 * 60 * 1000;
            break;
        case '1M':
            startDate.setUTCMonth(startDate.getUTCMonth() - 1);
            if (startDate.getUTCDate() !== baseDate.getUTCDate()) {
                startDate.setUTCDate(0); 
            }
            numPoints = 30;
            pointIncrementMillis = 24 * 60 * 60 * 1000;
            break;
        case '1Y':
        default:
            startDate.setUTCFullYear(startDate.getUTCFullYear() - 1);
            if (startDate.getUTCDate() !== baseDate.getUTCDate() || startDate.getUTCMonth() !== baseDate.getUTCMonth()) {
                startDate = new Date(Date.UTC(baseDate.getUTCFullYear() - 1, baseDate.getUTCMonth(), baseDate.getUTCDate()));
                startDate.setUTCHours(0,0,0,0);
            }
            numPoints = 365;
            pointIncrementMillis = 24 * 60 * 60 * 1000;
            break;
    }

    let currentValue = 25.50 + Math.random() * 2;
    let currentTimeMillis = startDate.getTime();

    for (let i = 0; i < numPoints; i++) {
        let timeValue;
        const currentPointDate = new Date(currentTimeMillis);

        if (range === '1D' || range === '1W') {
            timeValue = Math.floor(currentPointDate.getTime() / 1000); // Timestamp UNIX en segundos
        } else {
            const year = currentPointDate.getUTCFullYear();
            const month = (currentPointDate.getUTCMonth() + 1).toString().padStart(2, '0');
            const day = currentPointDate.getUTCDate().toString().padStart(2, '0');
            timeValue = `${year}-${month}-${day}`;
        }

        data.push({
            time: timeValue,
            value: currentValue,
        });

        currentValue += (Math.random() - 0.5) * 0.15;
        if (currentValue < 25) currentValue = 25 + Math.random() * 0.1;
        if (currentValue > 27) currentValue = 27 - Math.random() * 0.1;

        currentTimeMillis += pointIncrementMillis;
    }
    return data;
};

const dataByRange = {
    '1D': generateSampleData('1D'),
    '1W': generateSampleData('1W'),
    '1M': generateSampleData('1M'),
    '1Y': generateSampleData('1Y'),
};
// --- Fin de la lógica de generación de datos ---


const ChartComponent = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [activeRange, setActiveRange] = useState('1Y');

  const ranges = ['1D', '1W', '1M', '1Y'];

  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) {
      return;
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { type: ColorType.Solid, color: '#000000' },
        textColor: '#D1D4DC',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      },
      grid: {
        vertLines: { color: '#2A2E39' },
        horzLines: { color: '#2A2E39' },
      },
      timeScale: {
        borderColor: '#484C57',
        timeVisible: true, 
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: '#484C57',
      },
      crosshair: {
        mode: 1,
        vertLine: {
            color: 'rgba(197, 188, 219, 0.267)',
            style: LineStyle.Solid,
            labelBackgroundColor: '#9B7DFF',
        },
        horzLine: {
            color: '#9B7DFF',
            labelBackgroundColor: '#9B7DFF',
        },
      },
    });
    chartRef.current = chart;

    const newSeries = chart.addSeries(AreaSeries, {
        topColor: 'rgba(41, 98, 255, 0.4)',
        bottomColor: 'rgba(41, 98, 255, 0)',
        lineColor: '#2962FF',
        lineWidth: 2,
        priceLineVisible: true,
        lastValueVisible: true,
    });
    seriesRef.current = newSeries;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current && chartRef.current && dataByRange[activeRange]) {
      seriesRef.current.setData(dataByRange[activeRange]);
      chartRef.current.timeScale().fitContent();

      const isShortRange = activeRange === '1D' || activeRange === '1W';
      chartRef.current.timeScale().applyOptions({
        timeVisible: isShortRange,
        secondsVisible: activeRange === '1D',
      });
    }
  }, [activeRange]);

  return (
    <div style={{
        backgroundColor: '#000000',
        color: '#D1D4DC',
        padding: '20px',
        borderRadius: '8px',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Range switcher</h2>
        <button style={{
            backgroundColor: '#2A2E39',
            color: '#B2B5BE',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
        }}>
            {'</> Get this chart'}
        </button>
      </div>
      <div style={{
          marginBottom: '15px',
          backgroundColor: '#1E222D',
          padding: '4px',
          borderRadius: '4px',
          display: 'inline-flex'
      }}>
        {ranges.map((rangeItem) => (
          <button
            key={rangeItem}
            onClick={() => setActiveRange(rangeItem)}
            style={buttonStyle(activeRange === rangeItem)}
          >
            {rangeItem.toUpperCase()}
          </button>
        ))}
      </div>
      <div ref={chartContainerRef} style={{ width: '100%', height: '300px', borderRadius: '4px', overflow: 'hidden' }} />
    </div>
  );
};

export default ChartComponent;