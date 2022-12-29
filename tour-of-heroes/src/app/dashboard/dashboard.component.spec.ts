import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from '../hero';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeroSearchComponent],
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the Top Heroes subtitle', () => {
    const renderedComponent = fixture.nativeElement;
    const subtitle = renderedComponent.querySelector('h2');
    expect(subtitle.textContent).toEqual('Top Heroes');
  });
});
