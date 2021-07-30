import React from 'react';
import { initialData } from "./data";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import  {
elderRay,
ema,
discontinuousTimeScaleProviderBuilder,
Chart,
ChartCanvas,
CurrentCoordinate,
BarSeries,
CandlestickSeries,
ElderRaySeries,
LineSeries,
MovingAverageTooltip,
OHLCTooltip,
SingleValueTooltip,
lastVisibleItemBasedZoomAnchor,
XAxis,
YAxis,
CrossHairCursor,
EdgeIndicator,
MouseCoordinateX,
MouseCoordinateY,
ZoomButtons,
withDeviceRatio,
withSize
} from 'react-financial-charts';


// Chart example code borrowed from: https://codesandbox.io/s/react-financial-charts-demo-forked-b0cdc?file=/index.js:2229-2435
function IntraDayChart() {

    const height = 700;
    const width = 900;

    const margin = { left: 0, right: 48, top: 0, bottom: 24 };

    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d) => new Date(d.date)
      );

    const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(
        initialData
    );

    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    
    const xExtents = [min, max + 5];

    const gridHeight = height - margin.top - margin.bottom; //result: 676

    const elderRayHeight = 100;

    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];

    const barChartExtents = (data) => {
        return data.volume;
    };

    const volumeColor = (data) => {
      return data.close > data.open
        ? "rgba(38, 166, 154, 0.3)"
        : "rgba(239, 83, 80, 0.3)";
    };

    const volumeSeries = (data) => {
      return data.volume;
    };

    const stockData =  function() {
      let stockHistoryUrl = 'http://localhost:8000/invest/GetStockPriceHistory/';
      let interval = '15min';
      let stock = 'TSLA';
      let request = stockHistoryUrl + stock + '/' + interval;
      let response = fetch(request)
      .then((response) => response.json())
      .then((data) => console.log('Stock Data:', data));

      return response;
    }
    

    return (
        <ChartCanvas
            height={height}
            ratio={3}
            width={width}
            margin={margin}
            data={data}
            displayXAccessor={displayXAccessor}
            seriesName="Data"
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
            zoomAnchor={lastVisibleItemBasedZoomAnchor}
        >
            <Chart
              id={0}
              height={barChartHeight}
              origin={barChartOrigin}
              yExtents={barChartExtents}
            >
              <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
            </Chart>
            <p>{stockData}</p>
        </ChartCanvas>
    );
}


export default IntraDayChart;