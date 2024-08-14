import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
type Props = {
  className?: string
  items?: { x: number | string; y: number }[]
}

export const LineChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const div = useRef<HTMLDivElement>(null)
  const xItems = items?.map(item => item.x)
  const yItems = items?.map(item => item.y)
  const initialized = useRef(false)

  const myChart = useRef<echarts.ECharts>()

  useEffect(() => {
    if (!div.current) { return }
    if (initialized.current) { return }
    myChart.current = echarts.init(div.current)
    if (initialized.current) { return }
    const option: echarts.EChartsOption = {
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: ([{ axisValue, data }]: any) => {
          const parts = axisValue.split('-')
          const label = `${parts[0]}年${parts[1]}月${parts[2]}日`
          const value = data === null ? '无数据' : `${data}元`
          return `${label}<br/><div style="text-align: right;">${value}</div>`
        }
      },
      grid: {
        left: 16,
        top: 8,
        bottom: 24,
        right: 16
      },
      xAxis: {
        type: 'category',
        data: xItems,
        axisLabel: {
          formatter: (label: string, index: number) =>
            label.slice(label.indexOf('-') + 1)
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          data: yItems,
          type: 'line',
          emphasis: {
            itemStyle: {
              color: 'blue'
            }
          }
        }
      ]
    }

    myChart.current.setOption(option)
  }, [])

  useEffect(() => {
    const option: echarts.EChartsOption = {
      xAxis: { data: xItems, },
      series: [{ data: yItems, }]
    }
      myChart.current?.setOption(option)
  }, [items])

  return (
    <div ref={div} className={className}>LineChart </div>
  )
}
