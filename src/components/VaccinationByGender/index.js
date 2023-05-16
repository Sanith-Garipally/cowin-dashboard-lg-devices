import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts'
import './index.css'

const colors = ['#f54394', '#5a8dee', '#2cc6c6']

const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  return (
    <div className="vg-container">
      <h1>Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={vaccinationByGender}
          startAngle={180}
          endAngle={0}
          innerRadius={40}
          outerRadius={80}
          dataKey="count"
        >
          {vaccinationByGender.map((entry, index) => (
            <Cell
              name={entry.gender}
              key={`cell-${entry.gender}`}
              fill={colors[index]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          iconType="circle"
          iconSize={12}
          wrapperStyle={{fontSize: '12px'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
