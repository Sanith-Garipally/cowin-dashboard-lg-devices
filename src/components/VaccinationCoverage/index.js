import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {lastWeekVaccination} = props
  const formatTick = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="vc-container">
      <h1>Vaccination Coverage</h1>
      <BarChart width={1000} height={300} data={lastWeekVaccination}>
        <XAxis
          dataKey="vaccineDate"
          fontSize={15}
          fontWeight="bold"
          stroke="#6c757d"
        />
        <YAxis fontSize={15} stroke="#6c757d" tickFormatter={formatTick} />
        <Legend
          wrapperStyle={{
            paddingTop: '20px',
          }}
        />
        <Bar
          name="Dose 1"
          radius={[10, 10, 0, 0]}
          barSize={45}
          dataKey="dose1"
          fill="#5a8dee"
        />
        <Bar
          radius={[5, 5, 0, 0]}
          name="Dose 2"
          dataKey="dose2"
          fill="#f54394"
          barSize={45}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
