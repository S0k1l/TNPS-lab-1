import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MyChartComponent } from "../components/my-chart/my-chart.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MyChartComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  headers: string[] = ['Номер елемента', '1', '2', '3', '4', '5', '6', '7', '8'];

  displayedColumns: string[] = ['firstColumn', ...this.headers.slice(1)];

  firstColumnData: string[] = ['λ · 10<sup>-4</sup>, год<sup>-1</sup>', 'μ · 10<sup>-1</sup>, год<sup>-1</sup>', 'r, ум.один.'];

  tableData: number[][] = [
    [0.4, 0.05, 0.78, 0.08, 0.5, 0.9, 0.07, 0.8],
    [1, 0.09, 0.6, 0.4, 0.55, 0.2, 0.08, 0.7],
    [100, 230, 65, 98, 1289, 3498, 900, 8700],
  ];

  myT: number = 2000;
  myR: number = 500;
  t:number[] = [0, 1000, 2000, 3000, 4000, 5000, 6000]
  tKrTHeader: string[] = ['t', 'Krt'];

  seriesData:any;

  categories!: string[];
  myL!: number[];
  myU!: number[];
  my_r!: number[];
  T!: number;
  LdivU!: number;
  Kr!: number;
  LAvg!: number;
  Uavg!: number;
  KrT!: number[]
  SumLr!: number;
  sRt!: number;
  bRt!: number;
  Rt!: number;

  tKrT!: any;

  constructor(){
    this.GetData()
  }

  GetData(): void{

    this.myL = this.tableData[0];
    this.myU= this.tableData[1];
    this.my_r = this.tableData[2];
    this.T = this.FindT(this.myL);
    this.LdivU = this.FindLdivU(this.myL, this.myU)
    this.Kr = 1 / (1 + this.LdivU)
    this.LAvg = this.myL.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    this.Uavg = this.LAvg / this.LdivU;
    this.KrT = this.FindKrT(this.LAvg, this.Uavg, this.t);
    
    this.tKrT = this.t.map((value, index) => ({
      t: value,
      Krt: this.KrT[index],
    }));

    this.SumLr = this.FindSumLr(this.myL, this.my_r);
    this.sRt = this.myT * this.Kr;
    this.bRt = this.myT * this.SumLr;
    this.Rt = (this.bRt + this.sRt) / 2;

    this.seriesData = [
      {
        name: 'KrT',
        data: this.KrT.map(item => Number(item).toFixed(4)),
      }
    ]
    this.categories = this.t.map(String);
  }

  updateTableData(): void {
    for (let row = 0; row < this.tableData.length; row++) {
      for (let col = 1; col < this.tableData[row].length; col++) {
        this.tableData[row][col] = this.tableData[row][col];
      }
    }
    
    this.GetData();
  }

  FindT(myL: number[]): number{
    let sum: number = myL.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return Math.pow(10,4) / sum;
  }

  FindLdivU(myL: number[], myU: number[]): number{
    let sum = 0;

    for (let index = 0; index < myL.length; index++) {
      sum += myL[index] / myU[index]
    }

    return sum;
  }

  FindKrT(Lavg:number, Uavg:number, t:number[]): number[]{
    let num1 = Uavg / (Lavg + Uavg);
    let num2 = Lavg / (Lavg + Uavg);
    let KrT = new Array();

    for (let index = 0; index < t.length; index++) {
      KrT.push(num1 + (num2 * Math.pow(Math.E, -(Lavg + Uavg) * Math.pow(10, -4) * t[index])));
    }

    return KrT
  }

  FindSumLr(myL:number[], my_r:number[]): number{
    let sum = 0;

    for (let index = 0; index < myL.length; index++) {
      sum += myL[index] * my_r[index];
    }

    return Math.pow(10, -4) * sum;
  }
}
