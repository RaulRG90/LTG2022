import {
  OnDestroy,
  OnInit,
  OnChanges,
  EventEmitter,
  ElementRef,
  Input,
  Output,
  SimpleChanges,
  Directive,
} from '@angular/core';

import { Color } from './color.interface';
import { Colors } from './colors.interface';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

declare var Chart: any;

@Directive({ selector: 'canvas[mdbChart]', exportAs: 'mdb-base-chart' })
export class BaseChartDirective implements OnDestroy, OnChanges, OnInit, Colors {
  public static defaultColors: Array<number[]> = [
    [255, 99, 132],
    [54, 162, 235],
    [255, 206, 86],
    [231, 233, 237],
    [75, 192, 192],
    [151, 187, 205],
    [220, 220, 220],
    [247, 70, 74],
    [70, 191, 189],
    [253, 180, 92],
    [148, 159, 177],
    [77, 83, 96],
  ];

  @Input() public data: number[] | any[];
  @Input() public datasets: any[];
  @Input() public labels: Array<any> = [];
  @Input() public options: any = { legend: { display: false } };
  @Input() public chartType: string;
  @Input() public colors: Array<any>;

  @Input()
  get legend(): boolean {
    return this._legend;
  }
  set legend(value: BooleanInput) {
    this._legend = coerceBooleanProperty(value);
  }
  private _legend = false;

  @Output() public chartClick: EventEmitter<any> = new EventEmitter();
  @Output() public chartHover: EventEmitter<any> = new EventEmitter();

  public ctx: any;
  public chart: any;

  cvs: any;
  initFlag = false;

  isBrowser: any = false;

  public constructor(public element: ElementRef, @Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public ngOnInit(): any {
    if (this.isBrowser) {
      this.ctx = this.element.nativeElement.getContext('2d');
      this.cvs = this.element.nativeElement;
      this.initFlag = true;
      if (this.data || this.datasets) {
        this.refresh();
      }
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.initFlag) {
      // Check if the changes are in the data or datasets
      if (
        (changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets')) &&
        !changes.hasOwnProperty('labels')
      ) {
        if (changes['data']) {
          this.updateChartData(changes['data'].currentValue);
        } else {
          this.updateChartData(changes['datasets'].currentValue);
        }

        this.chart.update();
      } else {
        // otherwise rebuild the chart
        this.refresh();
      }
    }
  }

  public ngOnDestroy(): any {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
  }

  public getChartBuilder(ctx: any): any {
    const datasets: any = this.getDatasets();

    const options: any = Object.assign({}, this.options);
    if (this.legend === false) {
      options.legend = { display: false };
    }
    // hock for onHover and onClick events
    options.hover = options.hover || {};
    if (!options.hover.onHover) {
      options.hover.onHover = (event: any, active: Array<any>) => {
        if (active && active.length) {
          this.chartHover.emit({ event, active });
        }
      };
    }

    if (!options.onClick) {
      options.onClick = (event: any, active: Array<any>) => {
        this.chartClick.emit({ event, active });
      };
    }

    const opts = {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets: datasets,
      },
      options: options,
    };

    return new Chart(ctx, opts);
  }

  // feature(chart): added getPointDataAtEvent which will return clicked chart's point data
  public getPointDataAtEvent(event: any) {
    if (event.active.length > 0) {
      const datasetIndex = event.active[0]._datasetIndex;
      const dataIndex = event.active[0]._index;
      const dataObject = this.datasets[datasetIndex].data[dataIndex];
      return dataObject;
    }
  }

  private updateChartData(newDataValues: number[] | any[]): void {
    if (Array.isArray(newDataValues[0].data)) {
      this.chart.data.datasets.forEach((dataset: any, i: number) => {
        dataset.data = newDataValues[i].data;

        if (newDataValues[i].label) {
          dataset.label = newDataValues[i].label;
        }
      });
    } else {
      this.chart.data.datasets[0].data = newDataValues;
    }
  }

  private getDatasets(): any {
    let datasets: any = void 0;
    // in case if datasets is not provided, but data is present
    if (!this.datasets || (!this.datasets.length && this.data && this.data.length)) {
      if (Array.isArray(this.data[0])) {
        datasets = (this.data as Array<number[]>).map((data: number[], index: number) => {
          return { data, label: this.labels[index] || `Label ${index}` };
        });
      } else {
        datasets = [{ data: this.data, label: `Label 0` }];
      }
    }

    if ((this.datasets && this.datasets.length) || (datasets && datasets.length)) {
      datasets = (this.datasets || datasets).map((elm: number, index: number) => {
        const newElm: any = Object.assign({}, elm);
        if (this.colors && this.colors.length) {
          Object.assign(newElm, this.colors[index]);
        } else {
          Object.assign(newElm, getColors(this.chartType, index, newElm.data.length));
        }
        return newElm;
      });
    }

    if (!datasets) {
      throw new Error(`ng-charts configuration error,
      data or datasets field are required to render char ${this.chartType}`);
    }

    return datasets;
  }

  private refresh(): any {
    this.ngOnDestroy();
    this.chart = this.getChartBuilder(this.ctx);
  }
}

function rgba(colour: Array<number>, alpha: number): string {
  return 'rgba(' + colour.concat(alpha).join(',') + ')';
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatLineColor(colors: Array<number>): Color {
  return {
    backgroundColor: rgba(colors, 0.4),
    borderColor: rgba(colors, 1),
    pointBackgroundColor: rgba(colors, 1),
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: rgba(colors, 0.8),
  };
}

function formatBarColor(colors: Array<number>): Color {
  return {
    backgroundColor: rgba(colors, 0.6),
    borderColor: rgba(colors, 1),
    hoverBackgroundColor: rgba(colors, 0.8),
    hoverBorderColor: rgba(colors, 1),
  };
}

function formatPieColors(colors: Array<number[]>): any {
  return {
    backgroundColor: colors.map((color: number[]) => rgba(color, 0.6)),
    borderColor: colors.map(() => '#fff'),
    pointBackgroundColor: colors.map((color: number[]) => rgba(color, 1)),
    pointBorderColor: colors.map(() => '#fff'),
    pointHoverBackgroundColor: colors.map((color: number[]) => rgba(color, 1)),
    pointHoverBorderColor: colors.map((color: number[]) => rgba(color, 1)),
  };
}

function formatPolarAreaColors(colors: Array<number[]>): Color {
  return {
    backgroundColor: colors.map((color: number[]) => rgba(color, 0.6)),
    borderColor: colors.map((color: number[]) => rgba(color, 1)),
    hoverBackgroundColor: colors.map((color: number[]) => rgba(color, 0.8)),
    hoverBorderColor: colors.map((color: number[]) => rgba(color, 1)),
  };
}

function getRandomColor(): number[] {
  return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}

/**
 * Generate colors for line|bar charts
 */
function generateColor(index: number): number[] {
  return BaseChartDirective.defaultColors[index] || getRandomColor();
}

/**
 * Generate colors for pie|doughnut charts
 */
function generateColors(count: number): Array<number[]> {
  const colorsArr: Array<number[]> = new Array(count);
  for (let i = 0; i < count; i++) {
    colorsArr[i] = BaseChartDirective.defaultColors[i] || getRandomColor();
  }
  return colorsArr;
}

/**
 * Generate colors by chart type
 */
function getColors(chartType: string, index: number, count: number): any {
  if (chartType === 'pie' || chartType === 'doughnut') {
    return formatPieColors(generateColors(count));
  }

  if (chartType === 'polarArea') {
    return formatPolarAreaColors(generateColors(count));
  }

  if (chartType === 'line' || chartType === 'radar') {
    return formatLineColor(generateColor(index));
  }

  if (chartType === 'bar' || chartType === 'horizontalBar') {
    return formatBarColor(generateColor(index));
  }
  return generateColor(index);
}
