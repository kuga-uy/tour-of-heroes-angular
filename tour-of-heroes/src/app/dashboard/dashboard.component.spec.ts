import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { compileComponentFromMetadata } from '@angular/compiler';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj<HeroService>(['getHeroes']);
    heroServiceSpy.getHeroes.and.returnValue(
      of([
        { id: 1, name: 'Hero 1' },
        { id: 2, name: 'Hero 2' },
        { id: 3, name: 'Hero 3' },
        { id: 4, name: 'Hero 4' },
        { id: 5, name: 'Hero 5' },
        { id: 6, name: 'Hero 6' },
      ])
    );
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeroSearchComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: HeroService, useValue: heroServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('Needs to be 4 heroes', () => {
    const heroes = component.heroes;
    expect(heroes.length).toBe(4);
  });

  it('Needs to be 4 heroes', () => {
    expect(fixture.debugElement.queryAll(By.css('a')).length).toBe(4);
  });
});
