import { Component, ElementRef, ViewChild } from '@angular/core';
import { GridStack, GridStackOptions, GridStackPosition, GridStackWidget } from 'gridstack';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private grid!: GridStack;
  gridItems: GridStackWidget[] = [
    { id: '1', w: 3, h: 3, x: 0, y: 0 },
    { id: '2', w: 9, h: 4, x: 3, y: 0 },
    { id: '3', w: 1, h: 1, x: 1, y: 3 },
    { id: '4', w: 1, h: 1, x: 2, y: 3 },
    { id: '5', w: 1, h: 1, x: 0, y: 3}];
  gridOptions: GridStackOptions = {
    margin: 5,
    resizable: {
      handles: 'sw', //'e,se,s,sw,w'
    },
    column: Math.round((window.innerWidth - 60) / 150),
    cellHeight: Math.round((window.innerHeight - 70) / 4.08),
  }
  ngOnInit() {}
  ngAfterViewInit() {
    this.grid = GridStack.init(this.gridOptions, '.grid-stack');
    this.grid.on('change', (event: Event, items) => {
      for (const changedItem of items) {
        const el = (changedItem as any).el as HTMLElement;
        const id = el.getAttribute('data-gs-id');
        const target = this.gridItems.find(item => String(item.id) === id);
        if (target) {
          target.x = changedItem.x;
          target.y = changedItem.y;
          target.w = changedItem.w;
          target.h = changedItem.h;
        }
      } 
      this.saveGridItem();
    });
  }
  saveGridItem() { 
    console.log('GridItems Saved')
  }
  
}
