import { Component, HostBinding, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    GanttBarClickEvent,
    GanttBaselineItem,
    GanttDragEvent,
    GanttItem,
    GanttLineClickEvent,
    GanttLinkDragEvent,
    GanttPrintService,
    GanttSelectedEvent,
    GanttTableDragDroppedEvent,
    GanttTableDragEndedEvent,
    GanttTableDragEnterPredicateContext,
    GanttTableDragStartedEvent,
    GanttToolbarOptions,
    GanttView,
    GanttViewType,
    NgxGanttComponent,
    NgxGanttModule,
} from '@worktile/gantt';
import { delay, finalize, of } from 'rxjs';
import { random, randomItems } from './helper';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NgxGanttModule, DatePipe, MatToolbarModule, MatButtonModule, MatButtonToggleModule, NgIf, NgFor, MatSlideToggleModule, MatIconModule],
    providers: [GanttPrintService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    views = [
        {
            name: 'Hour',
            value: GanttViewType.hour,
        },
        {
            name: 'Day',
            value: GanttViewType.day,
        },
        {
            name: 'Week',
            value: GanttViewType.week,
        },
        {
            name: 'Month',
            value: GanttViewType.month,
        },
        {
            name: 'Quarter',
            value: GanttViewType.quarter,
        },
        {
            name: 'Year',
            value: GanttViewType.year,
        },
    ];

    viewType: GanttViewType = GanttViewType.month;

    selectedViewType: GanttViewType = GanttViewType.month;

    isBaselineChecked = false;

    isShowToolbarChecked = false;

    loading = false;

    items: GanttItem[] = [
        {
            id: '1',
            title: 'Freshsales',
            start: 1723384893,
            end: 1725591893,
            links: [],
            color: '#0D47A1',
            children: [
                { id: '1.1', title: 'Task 1', start: 1723500000, end: 1723700000, links: [], color: '#0D47A1' },
                { id: '1.2', title: 'Task 2', start: 1723800000, end: 1724000000, links: [], color: '#0D47A1' },
                { id: '1.3', title: 'Task 3', start: 1724100000, end: 1724300000, links: [], color: '#0D47A1' },
            ],
        },
        {
            id: '2',
            title: 'Freshmarketer',
            start: 1723384893,
            end: 1725591893,
            links: [],
            color: '#B71C1C',
            children: [
                { id: '2.1', title: 'Task 1', start: 1723600000, end: 1723800000, links: [], color: '#B71C1C' },
                { id: '2.2', title: 'Task 2', start: 1723900000, end: 1724100000, links: [], color: '#B71C1C' },
                { id: '2.3', title: 'Task 3', start: 1724200000, end: 1724400000, links: [], color: '#B71C1C' },
                { id: '2.4', title: 'Task 4', start: 1724500000, end: 1724700000, links: [], color: '#B71C1C' },
            ],
        },
        {
            id: '3',
            title: 'Freshchat',
            start: 1723384893,
            end: 1725591893,
            links: [],
            color: '#4A148C',
            children: [
                { id: '3.1', title: 'Task 1', start: 1723700000, end: 1723900000, links: [], color: '#4A148C' },
                { id: '3.2', title: 'Task 2', start: 1724000000, end: 1724200000, links: [], color: '#4A148C' },
                { id: '3.3', title: 'Task 3', start: 1724300000, end: 1724500000, links: [], color: '#4A148C' },
                { id: '3.4', title: 'Task 4', start: 1724600000, end: 1724800000, links: [], color: '#4A148C' },
                { id: '3.5', title: 'Task 5', start: 1724900000, end: 1725100000, links: [], color: '#4A148C' },
            ],
        },
        {
            id: '4',
            title: 'Freshsuccess',
            start: 1723384893,
            end: 1725591893,
            links: [],
            color: '#006064',
            children: [
                { id: '4.1', title: 'Task 1', start: 1723800000, end: 1724000000, links: [], color: '#006064' },
                { id: '4.2', title: 'Task 2', start: 1724100000, end: 1724300000, links: [], color: '#006064' },
                { id: '4.3', title: 'Task 3', start: 1724400000, end: 1724600000, links: [], color: '#006064' },
            ],
        },
        {
            id: '5',
            title: 'Freshcaller',
            start: 1723384893,
            end: 1725591893,
            links: [],
            color: '#33691E',
            children: [
                { id: '5.1', title: 'Task 1', start: 1723900000, end: 1724100000, links: [], color: '#33691E' },
                { id: '5.2', title: 'Task 2', start: 1724200000, end: 1724400000, links: [], color: '#33691E' },
                { id: '5.3', title: 'Task 3', start: 1724500000, end: 1724700000, links: [], color: '#33691E' },
            ],
        },
        {
            id: '6',
            title: 'Freshdesk',
            start: 1723384893,
            end: 1725591893,
            links: [],
            color: '#FF6F00',
            children: [
                { id: '6.1', title: 'Task 1', start: 1724000000, end: 1724200000, links: [], color: '#FF6F00' },
                { id: '6.2', title: 'Task 2', start: 1724300000, end: 1724500000, links: [], color: '#FF6F00' },
                { id: '6.3', title: 'Task 3', start: 1724600000, end: 1724800000, links: [], color: '#FF6F00' },
                { id: '6.4', title: 'Task 4', start: 1724900000, end: 1725100000, links: [], color: '#FF6F00' },
                { id: '6.5', title: 'Task 5', start: 1725200000, end: 1725400000, links: [], color: '#FF6F00' },
            ],
        },
        {
            id: '7',
            title: 'Freshservice',
            start: 1723384893,
            end: 1725591893,
            links: [],
            color: '#6D4C41',
            children: [
                { id: '7.1', title: 'Task 1', start: 1724100000, end: 1724300000, links: [], color: '#6D4C41' },
                { id: '7.2', title: 'Task 2', start: 1724400000, end: 1724600000, links: [], color: '#6D4C41' },
                { id: '7.3', title: 'Task 3', start: 1724700000, end: 1724900000, links: [], color: '#6D4C41' },
            ],
        },
    ];

    toolbarOptions: GanttToolbarOptions = {
        viewTypes: [GanttViewType.day, GanttViewType.month, GanttViewType.year],
    };

    baselineItems: GanttBaselineItem[] = [];

    options = {
        viewType: GanttViewType.day,
    };

    viewOptions = {
        dateFormat: {
            hour: 'HH:mm',
            day: 'M d',
            week: 'w',
            month: 'M',
            quarter: 'QQQ',
            year: 'yyyy',
            yearMonth: 'yyyy MM',
            yearQuarter: 'yyyy QQQ',
        },
    };

    @HostBinding('class.gantt-example-component') class = true;

    @ViewChild('gantt') ganttComponent: NgxGanttComponent | undefined;

    dropEnterPredicate = (event: GanttTableDragEnterPredicateContext) => {
        return true;
    };

    constructor(private printService: GanttPrintService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon('github', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/github-mark.svg'));
    }

    ngOnInit(): void {
        // init items children
    }

    ngAfterViewInit() {
        setTimeout(() => this.ganttComponent?.scrollToDate(1627729997), 200);
    }

    barClick(event: GanttBarClickEvent) {
        // this.thyNotify.info('Event: barClick', `你点击了 [${event.item.title}]`);
    }

    lineClick(event: GanttLineClickEvent) {
        // this.thyNotify.info(
        //   'Event: lineClick',
        //   `你点击了 ${event.source.title} 到 ${event.target.title} 的关联线`
        // );
    }

    dragMoved(event: GanttDragEvent) {}

    dragEnded(event: GanttDragEvent) {
        // this.thyNotify.info(
        //   'Event: dragEnded',
        //   `修改了 [${event.item.title}] 的时间`
        // );
        this.items = [...this.items];
    }

    selectedChange(event: GanttSelectedEvent) {
        // event.current && this.ganttComponent.scrollToDate(event.current?.start);
        // this.thyNotify.info(
        //   'Event: selectedChange',
        //   `当前选中的 item 的 id 为 ${(event.selectedValue as GanttItem[])
        //     .map((item) => item.id)
        //     .join('、')}`
        // );
    }

    linkDragEnded(event: GanttLinkDragEvent) {
        this.items = [...this.items];
        // this.thyNotify.info('Event: linkDragEnded', `创建了关联关系`);
    }

    print(name: string) {
        this.printService.print(name);
    }

    scrollToToday() {
        this.ganttComponent?.scrollToToday();
    }

    switchChange() {
        if (this.isBaselineChecked) {
            this.baselineItems = [
                { id: '000000', start: 1627728888, end: 1628421197 },
                { id: '000001', start: 1617361997, end: 1625483597 },
                { id: '000002', start: 1610536397, end: 1610622797 },
                { id: '000003', start: 1628507597, end: 1633345997 },
                { id: '000004', start: 1624705997 },
            ];
        } else {
            this.baselineItems = [];
        }
    }

    selectView(type: GanttViewType) {
        this.viewType = type;
        this.selectedViewType = type;
    }

    viewChange(event: GanttView) {
        console.log(event.viewType);
        this.selectedViewType = event.viewType;
    }

    refresh() {
        this.loading = true;
        of(randomItems(30))
            .pipe(
                delay(2000),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((res) => {
                this.items = res;
            });
    }

    onDragDropped(event: GanttTableDragDroppedEvent) {
        const sourceItems = event.sourceParent?.children || this.items;
        sourceItems.splice(sourceItems.indexOf(event.source), 1);
        if (event.dropPosition === 'inside') {
            event.target.children = [...(event.target.children || []), event.source];
        } else {
            const targetItems = event.targetParent?.children || this.items;
            if (event.dropPosition === 'before') {
                targetItems.splice(targetItems.indexOf(event.target), 0, event.source);
            } else {
                targetItems.splice(targetItems.indexOf(event.target) + 1, 0, event.source);
            }
        }
        this.items = [...this.items];
    }

    onDragStarted(event: GanttTableDragStartedEvent) {
        console.log('拖拽开始了', event);
    }

    onDragEnded(event: GanttTableDragEndedEvent) {
        console.log('拖拽结束了', event);
    }
}
