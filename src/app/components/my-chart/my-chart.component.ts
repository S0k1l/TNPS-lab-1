import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
};


@Component({
  selector: 'app-my-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './my-chart.component.html',
  styleUrl: './my-chart.component.css'
})
export class MyChartComponent implements OnChanges, OnInit {
  @ViewChild("chart", { static: false }) chart!: ChartComponent;

  @Input() seriesData: ApexAxisChartSeries = [];
  @Input() categories: string[] = [];

  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [{
        name: 'series-1',
        data: [44, 55, 13, 33]
      }],
    };
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: this.seriesData,
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Графік функції готовності системи",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.categories,
      },
      markers: {
        size: 6,
        hover: {
          size: 8,
        },
      },
    };
  }

  public updateSeries() {
    this.chartOptions.series = this.seriesData
  }

  ngOnChanges(): void {
    this.updateSeries();
  }
}