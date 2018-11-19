import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSearchPageComponent } from './pages/job-search-page/job-search-page.component';
import { CounterComponent } from './componentns/counter/counter.component';
import { FilterPanelComponent } from './componentns/filter-panel/filter-panel.component';
import { ResultComponent } from './result/result.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule
  ],
  declarations: [JobSearchPageComponent, CounterComponent, FilterPanelComponent, ResultComponent]
})
export class SearchModule {
}
