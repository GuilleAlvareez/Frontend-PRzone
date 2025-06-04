import { useEffect, useRef } from 'react';
import { createChart, AreaSeries, ColorType, LineStyle } from 'lightweight-charts';
import './RangeSwitcherChart.css';

const ChartComponent = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  const transformedData = data.map(item => ({
    time: item.fecha,
    value: parseFloat(item.rm_estimado) // convertimos a número decimal
  }));

  console.log("Original data:", data);
  console.log("Transformed data:", transformedData);

  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { type: ColorType.Solid, color: '#f9fafb' },
        textColor: '#101828',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      },
      grid: {
        vertLines: { color: '#e5e5e5' },
        horzLines: { color: '#e5e5e5' },
      },
      timeScale: {
        borderColor: '#c9c9c9',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: '#c9c9c9',
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

    const series = chart.addSeries(AreaSeries, {
      topColor: 'rgba(41, 98, 255, 0.4)',
      bottomColor: 'rgba(41, 98, 255, 0)',
      lineColor: '#2962FF',
      lineWidth: 2,
      priceLineVisible: true,
      lastValueVisible: true,
    });

    seriesRef.current = series;

    series.setData(transformedData);

    // Aquí puedes establecer los datos reales
    // series.setData([
    //   { time: '2023-06-01', value: 25.3 },
    //   { time: '2023-06-02', value: 26.1 },
    //   { time: '2023-06-03', value: 25.8 },
    //   { time: '2023-06-04', value: 26.5 },
    // ]);

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
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;

    const transformedData = data.map(item => ({
      time: item.fecha,
      value: parseFloat(item.rm_estimado),
    }));

    console.log("Transformed data:", transformedData);
    seriesRef.current.setData(transformedData);
  }, [data]);

  return (
    <div style={{
      backgroundColor: '#f9fafb',
      color: '#D1D4DC',
      padding: '20px',
      borderRadius: '8px',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    }}>
      <div ref={chartContainerRef} style={{ width: '100%', height: '300px', borderRadius: '4px', overflow: 'hidden' }} />
    </div>
  );
};

export default ChartComponent;
