import { KeyedWrite } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { json } from 'd3';
import { ChartdataService } from '../chartdata.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})


export class BarComponent implements OnInit {

  public data3 = [{ "reading_time": "2022-02-12 00:00:31", "KWh_D": "182374.31", "KVARh_D": "15991.90", "KVARh_R": "2083", "KVAh_D": "189339.11" },
                  { "reading_time": "2022-02-11 00:00:54", "KWh_D": "181357.81", "KVARh_D": "15986.07", "KVARh_R": "2072", "KVAh_D": "188303.31" },
                  { "reading_time": "2022-02-10 00:00:17", "KWh_D": "180341.69", "KVARh_D": "15981.67", "KVARh_R": "2060", "KVAh_D": "187267.13" },
                  { "reading_time": "2022-02-09 00:00:27", "KWh_D": "179243.16", "KVARh_D": "15973.72", "KVARh_R": "2047", "KVAh_D": "186148.84" },
                  { "reading_time": "2022-02-08 00:00:36", "KWh_D": "178247.63", "KVARh_D": "15970.37", "KVARh_R": "2035", "KVAh_D": "185134.72" },
                  { "reading_time": "2022-02-07 00:00:46", "KWh_D": "177250.22", "KVARh_D": "15966.28", "KVARh_R": "2022", "KVAh_D": "184117.13" }, { "reading_time": "2022-02-06 00:00:00", "KWh_D": "177214.52", "KVARh_D": "15966.13", "KVARh_R": "2017", "KVAh_D": "184056.44" }, { "reading_time": "2022-02-05 00:00:27", "KWh_D": "176191.78", "KVARh_D": "15960.64", "KVARh_R": "2005", "KVAh_D": "183014.06" }, { "reading_time": "2022-02-04 00:00:03", "KWh_D": "175203.38", "KVARh_D": "15957.46", "KVARh_R": "1992", "KVAh_D": "182004.86" }, { "reading_time": "2022-02-03 00:00:36", "KWh_D": "174273.30", "KVARh_D": "15952.09", "KVARh_R": "1979", "KVAh_D": "181054.84" }, { "reading_time": "2022-02-02 00:01:24", "KWh_D": "173337.31", "KVARh_D": "15946.52", "KVARh_R": "", "KVAh_D": "180094.77" }, { "reading_time": "2022-02-01 00:00:07", "KWh_D": "172565.31", "KVARh_D": "15943.21", "KVARh_R": "1953", "KVAh_D": "179302.59" }, { "reading_time": "2022-01-31 00:00:23", "KWh_D": "171758.72", "KVARh_D": "15937.24", "KVARh_R": "1941", "KVAh_D": "178475.48" }, { "reading_time": "2022-01-30 00:00:45", "KWh_D": "171720.95", "KVARh_D": "15936.64", "KVARh_R": "1937", "KVAh_D": "178412.77" }, { "reading_time": "2022-01-29 00:00:03", "KWh_D": "170984.09", "KVARh_D": "15933.25", "KVARh_R": "1926", "KVAh_D": "177655.70" }, { "reading_time": "2022-01-28 00:00:34", "KWh_D": "169963.27", "KVARh_D": "15924.60", "KVARh_R": "1915", "KVAh_D": "176614.73" }, { "reading_time": "2022-01-27 00:00:15", "KWh_D": "168872.30", "KVARh_D": "15913.80", "KVARh_R": "1904", "KVAh_D": "175503.75" }, { "reading_time": "2022-01-26 00:00:47", "KWh_D": "168834.70", "KVARh_D": "15913.04", "KVARh_R": "1899", "KVAh_D": "175441.92" }, { "reading_time": "2022-01-25 00:00:56", "KWh_D": "167723.63", "KVARh_D": "15905.07", "KVARh_R": "1888", "KVAh_D": "174311.77" }, { "reading_time": "2022-01-24 00:00:34", "KWh_D": "166709.14", "KVARh_D": "15901.36", "KVARh_R": "1876", "KVAh_D": "173276.13" }, { "reading_time": "2022-01-23 00:00:15", "KWh_D": "166676.11", "KVARh_D": "15901.36", "KVARh_R": "1871", "KVAh_D": "173216.06" }, { "reading_time": "2022-01-22 00:00:24", "KWh_D": "165737.94", "KVARh_D": "15897.50", "KVARh_R": "1858", "KVAh_D": "172258.00" }, { "reading_time": "2022-01-21 00:00:38", "KWh_D": "164821.47", "KVARh_D": "15895.07", "KVARh_R": "1846", "KVAh_D": "171321.89" }, { "reading_time": "2022-01-20 00:01:01", "KWh_D": "163912.03", "KVARh_D": "15891.10", "KVARh_R": "1833", "KVAh_D": "170392.09" }];

  private svg: any;
  private margin = 50;
  private width = 1000 - (this.margin * 2);
  private height = 300 - (this.margin * 2);

  KWh_D_data = [5, 4, 3, 2, 1];
//       KW2 = [4, 3, 2, 1];
  KWh_D_data1 = this.KWh_D_data;
  
  KWh_D_data2 = this.KWh_D_data
  data1: any;
  data2: any;
  results: any;
  b:any=[];
  resultarray: any=[];
  KWh_D_diff: any=[];


  
  // let list: string[] = [];
  // json.Results.forEach(element => {
  //   list.push(element.Id);
  //   });


  // var ids:string = [];
  // for(let result of this.results){
  //  ids.push(result.Id);
  // }

  constructor(public user: ChartdataService) {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      // this.messageSuccess = false;
  
    
  }, 3000);
    // var a:any = [];
    // console.log(Object.keys(this.b))
    // for(let result of this.b){
    //   // a.push(result.KWh_D);
    // } 
    // console.log(a);
console.log("call1");

  }


  ngOnInit(): void {
    console.log("call2");
    

    this.user.getData().subscribe(res => {
      this.b =res;
     console.log(this.b);
     // console.log(this.results);
     this.createSvg();
    this.drawBars(this.b)
    this.sortdata();
   })
    ;
    // console.log(this.data2);
    this.user.getData().subscribe(data1 => {
      // this.data2 = data1;
      // this.createSvg();
      // this.drawBars(this.data2[0]);
      // console.log(this.data2[0]);
    })
    // this.KWh_D_data1.pop();
    this.KWh_D_data2.shift();
    // console.log(this.KWh_D_data1);
    // console.log(this.KWh_D_data2);
    let KWh_D_diff = [];
    let KWh_D=[];
    // console.log(this.KWh_D_data);
    // console.log(this.KWh_D_data1);
    for(let i = 0; i < 5; i++){
      // KWh_D_diff.push(this.KWh_D_data[i] - this.KWh_D_data1[i]);
    }
    // console.log(KWh_D_diff);
  }

 sortdata(){
   for(let i=0; i<this.b.length;i++){
    //  console.log(this.b[i].KWh_D);
     this.KWh_D_diff.push(this.b[i].KWh_D);
          
   }
   console.log(this.KWh_D_diff);

   for(let i =0 ; i<this.KWh_D_data.length; i++){
    let result=this.KWh_D_data[i]-this.KWh_D_data[i+1]

  //  resultarray:any=[]

    this.resultarray.push(result)
  }

  console.log(this.resultarray,"<==========resultarray")
 }





  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }



  drawBars(data: any[]): void {
    // Create the X-axis band scale
       const x = d3.scaleBand()
      .range([0, 300])
      .domain(data.map(d => d.KWh_D))
      .padding(0.6);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([100000, 200000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(this.b)
      .enter()
      .append("rect")
      .attr("x", (d: { KWh_D: string; }) => x(d.KWh_D))
      .attr("y", (d: { KWh_D: d3.NumberValue; }) => y(d.KWh_D))
      .attr("width", x.bandwidth())
      .attr("height", (d: { KWh_D: d3.NumberValue; }) => this.height - y(d.KWh_D))
      .attr("fill", "#0000FF");

  }


}
