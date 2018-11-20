import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSearchPageComponent } from './pages/job-search-page/job-search-page.component';
import { CounterComponent } from './components/counter/counter.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { SearchRoutingModule } from './search-routing.module';
import { ResultListItemComponent } from './components/result-list-item/result-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule
  ],
  declarations: [JobSearchPageComponent, CounterComponent, FilterPanelComponent, ResultListItemComponent]
})
export class SearchModule {
}
