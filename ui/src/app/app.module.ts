import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Http client module */
import { HttpClientModule } from '@angular/common/http';

/* Service */
import {BoardService} from "./shared/board.service";
import {ShipService} from "./shared/ship.service";

/* Forms module */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


/* Components */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BattleBoardComponent } from './components/battle-board/battle-board.component';
import {BoardStaticService} from "./shared/board.static.service";

@NgModule({
  declarations: [
    AppComponent,
    BattleBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [BoardService, ShipService, BoardStaticService],
  bootstrap: [AppComponent]
})

export class AppModule {}
