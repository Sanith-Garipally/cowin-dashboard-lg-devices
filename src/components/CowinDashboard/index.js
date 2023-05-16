import Loader from 'react-loader-spinner'
import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class CowinDashboard extends Component {
  state = {
    lastWeekVaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccineData()
  }

  getVaccineData = async () => {
    try {
      this.setState({apiStatus: apiStatusConstants.inProgress})
      const vaccinationDataApiUrl =
        'https://apis.ccbp.in/covid-vaccination-data'
      const options = {
        method: 'GET',
      }
      const response = await fetch(vaccinationDataApiUrl, options)

      if (response.ok) {
        const data = await response.json()
        this.onApiSuccess(data)
      } else {
        this.onApiFailure()
      }
    } catch (e) {
      this.onApiFailure()
    }
  }

  onApiSuccess = data => {
    const lastWeekVaccineData = data.last_7_days_vaccination
    const vaccinationByAge = data.vaccination_by_age
    const vaccinationByGender = data.vaccination_by_gender

    const formattedWeeksVaccineData = lastWeekVaccineData.map(object => ({
      vaccineDate: object.vaccine_date,
      dose1: object.dose_1,
      dose2: object.dose_2,
    }))

    this.setState({
      lastWeekVaccination: formattedWeeksVaccineData,
      vaccinationByAge,
      vaccinationByGender,
      apiStatus: apiStatusConstants.success,
    })
  }

  onApiFailure = () => {
    this.setState({
      apiStatus: apiStatusConstants.failure,
    })
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderApiFailure = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="failure-para">Something went wrong</h1>
    </div>
  )

  renderVaccineData = () => {
    const {
      lastWeekVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <>
        <VaccinationCoverage lastWeekVaccination={lastWeekVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="img-container">
            <img
              className="logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png "
            />
            <p className="para-1">Co-WIN</p>
          </div>
          <h1 className="head-1">CoWIN Vaccination in India</h1>
          {(() => {
            switch (apiStatus) {
              case apiStatusConstants.inProgress:
                return this.renderLoader()
              case apiStatusConstants.success:
                return this.renderVaccineData()
              case apiStatusConstants.failure:
                return this.renderApiFailure()
              default:
                return null
            }
          })()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
