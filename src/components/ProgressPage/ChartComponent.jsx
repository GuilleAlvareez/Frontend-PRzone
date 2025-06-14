import { useEffect, useRef } from 'react';
import { createChart, AreaSeries, ColorType, LineStyle } from 'lightweight-charts';
import './RangeSwitcherChart.css';
import { useTheme } from '../../context/ThemeContext';

const ChartComponent = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const { theme } = useTheme();

  const transformedData = data.map(item => ({
    time: item.fecha,
    value: parseFloat(item.rm_estimado) // convertimos a número decimal
  }));

  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { 
          type: ColorType.Solid, 
          color: theme === 'dark' ? '#1e293b' : '#f9fafb' 
        },
        textColor: theme === 'dark' ? '#e2e8f0' : '#101828',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      },
      grid: {
        vertLines: { color: theme === 'dark' ? '#334155' : '#e5e5e5' },
        horzLines: { color: theme === 'dark' ? '#334155' : '#e5e5e5' },
      },
      timeScale: {
        borderColor: theme === 'dark' ? '#475569' : '#c9c9c9',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: theme === 'dark' ? '#475569' : '#c9c9c9',
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: theme === 'dark' ? 'rgba(226, 232, 240, 0.2)' : 'rgba(197, 188, 219, 0.267)',
          style: LineStyle.Solid,
          labelBackgroundColor: theme === 'dark' ? '#6366f1' : '#9B7DFF',
        },
        horzLine: {
          color: theme === 'dark' ? '#6366f1' : '#9B7DFF',
          labelBackgroundColor: theme === 'dark' ? '#6366f1' : '#9B7DFF',
        },
      },
    });

    chartRef.current = chart;

    const series = chart.addSeries(AreaSeries, {
      topColor: theme === 'dark' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(41, 98, 255, 0.4)',
      bottomColor: theme === 'dark' ? 'rgba(99, 102, 241, 0)' : 'rgba(41, 98, 255, 0)',
      lineColor: theme === 'dark' ? '#6366f1' : '#2962FF',
      lineWidth: 2,
      priceLineVisible: true,
      lastValueVisible: true,
    });

    seriesRef.current = series;

    series.setData(transformedData);

    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      chartRef.current = null;
    };
  }, [theme]);

  useEffect(() => {
    if (!seriesRef.current) return;

    const transformedData = data.map(item => ({
      time: item.fecha,
      value: parseFloat(item.rm_estimado),
    }));

    seriesRef.current.setData(transformedData);
  }, [data]);

  return (
    <div style={{
      backgroundColor: theme === 'dark' ? '#1e293b' : '#f9fafb',
      color: theme === 'dark' ? '#e2e8f0' : '#D1D4DC',
      padding: '20px',
      borderRadius: '8px',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    }}>
      <div ref={chartContainerRef} style={{ width: '100%', height: '300px', borderRadius: '4px', overflow: 'hidden' }} />
    </div>
  );
};

export default ChartComponent;
