import React, {useState, useEffect} from 'react'
import style from './Weather.module.css'
import {connect} from 'react-redux'
import {getWeather, loadCities} from '../Redux/weatherReducer'

const Weather = (props) => {
    const [title, setTitle] = useState("")

    useEffect(() => {
        props.loadCities();
    }, [])

    const titleChanged = (e) => {
        let cityName = e.currentTarget.value;
        setTitle(cityName);
    }

    const submitForm = (e) => {
        e.preventDefault()
        props.getWeather(title)
        setTitle("")
    }

    return (
        <div className={style.weather}>
            <h2 className={style.title}>Weather</h2>
            {props.error && <div>{props.error}</div>}
            <div>
                <input onChange={titleChanged}
                       placeholder="City..."
                       list="cities"
                       value={title}/>
                <button onClick={submitForm} disabled={!title.trim().length}>
                    Search
                </button>
                <datalist id="cities">
                    {props.cities.map(c => {
                        return <option key={c} value={c}/>
                    })}
                </datalist>
            </div>
            {
                !props.error &&
                <>
                    <span><b>{props.city}</b>: {props.temperature} ℃</span>
                    <div>Wind speed: {props.windSpeed} м/с</div>
                    <div>Wind direction: {props.directionOfTheWind}</div>
                </>
            }
        </div>
    );
}
let mapStateToProps = (state) => {
    return {
        city: state.weatherPage.city,
        temperature: state.weatherPage.temp,
        windSpeed: state.weatherPage.windSpeed,
        directionOfTheWind: state.weatherPage.dirOfWind,
        isResponseFromServer: state.weatherPage.isResponseFromServer,
        cities: state.weatherPage.cities,
        error: state.weatherPage.error

    }

}
let mapDispatchToProps = (dispatch) => {
    return {
        loadCities: () => {
            dispatch(loadCities())
        },
        getWeather: (title) => {
            dispatch(getWeather(title));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Weather);
