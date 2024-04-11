
import { useTheme } from '@mui/material'
import { ResponsiveLine } from '@nivo/line'
import { tokens } from '../../../theme';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const Hero = ({ data /* see data tab */ }) => {

    const theme=useTheme();
    const colors=tokens(theme.palette.mode)
    const blueColor = '#92b9ff';

    return(
        
        <ResponsiveLine
        data={data}
        colors={[blueColor]}
        theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[900],
            },
          },
          legend: {
            text: {
              fill: colors.grey[900],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[900],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[900],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[900],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[100],
          },
        },
        layers:[],
        defs: {}
      }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Days',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total Users',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enablePoints={false}
        sliceTooltip={false}
        defs={false}
        fill={false}
        enableTouchCrosshair={true}
        
        debugMesh={false}
        debugSlices={false}
        enableCrosshair={true} // Add enableCrosshair prop here
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />)
}