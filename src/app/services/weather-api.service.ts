import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import key from '../../assets/data/key.json'

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  constructor(private readonly http: HttpClient) {}

  weather(param: any) {
    return this.http.get<any>(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${param[0].lat}&lon=${param[0].lon}&units=metric&appid=${key}`
    );
  }
}
