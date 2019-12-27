import React from 'react'
import { View } from 'react-native'
import { Svg, Rect, G, Text } from 'react-native-svg'
import AbstractChart from './abstract-chart'

const barWidth = 32

class BarChart extends AbstractChart {
  getBarPercentage = () => {
    const { barPercentage = 1 } = this.props.chartConfig
    return barPercentage
  }

  renderBars = config => {
    const { data, width, height, paddingTop, paddingRight } = config
    const baseHeight = this.calcBaseHeight(data, height)

    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height)
      const barWidth = Math.floor(this.props.barwidth) * this.getBarPercentage()
      return (
        <Rect
          key={Math.random()}
          x={
            paddingRight +
            (i * (width - paddingRight)) / data.length +
            barWidth / 2
          }
          y={
            ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 +
            paddingTop
          }
          width={barWidth}
          height={(Math.abs(barHeight) / 4) * 3}
          fill="#f89a3680"
        />
      )
    })
  }

  renderBarTops = config => {
    const { data, width, height, paddingTop, paddingRight } = config
    const baseHeight = this.calcBaseHeight(data, height)
    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height)
      const barWidth = Math.floor(this.props.barwidth) * this.getBarPercentage()
      let r = []
      const xf = paddingRight +
        (i * (width - paddingRight)) / data.length + barWidth / 2
      r.push(
        <Rect
          key={Math.random()}
          x={xf}
          y={((baseHeight - barHeight) / 4) * 3 + paddingTop}
          width={barWidth}
          height={2}
          fill={"#f89a36"}
        />
      )
      r.push(
        <Text
          key={Math.random()}
          x={x < 10 ? xf + barWidth / 2 : x < 100 ? xf + barWidth / 2 + 7 : xf + barWidth / 2 + 14}
          textAnchor="end"
          y={((baseHeight - barHeight) / 4) * 3 + paddingTop - 5}
          fontSize={12}
          fill="#000"
        >
          {x == 0 ? '' : x}
        </Text>
      )
      return r
    })
  }

  render() {
    const paddingTop = 16
    const paddingRight = 50
    const {
      width,
      height,
      data,
      style = {},
      withHorizontalLabels = true,
      withVerticalLabels = true,
      verticalLabelRotation = 0,
      horizontalLabelRotation = 0
    } = this.props
    const { borderRadius = 0 } = style
    const config = {
      width,
      height,
      verticalLabelRotation,
      horizontalLabelRotation
    }
    const barWidth = Math.floor(this.props.barwidth)
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            {this.renderHorizontalLines({
              ...config,
              count: 4,
              paddingTop
            })}
          </G>
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels({
                ...config,
                count: 4,
                data: data.datasets[0].data,
                paddingTop,
                paddingRight
              })
              : null}
          </G>
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels({
                ...config,
                labels: data.labels,
                paddingRight,
                paddingTop,
                horizontalOffset: barWidth * this.getBarPercentage()
              })
              : null}
          </G>
          <G>
            {this.renderBars({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </G>
          <G>
            {this.renderBarTops({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </G>
        </Svg>
      </View>
    )
  }
}

export default BarChart


