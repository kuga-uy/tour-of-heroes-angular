import { HttpClient, HttpHandler } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';

import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [],
      providers: [HttpClient, HttpHandler, HeroService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the My Heroes subtitle', () => {
    const renderedComponent = fixture.nativeElement;
    const subtitle = renderedComponent.querySelector('h2');
    expect(subtitle.textContent).toEqual('My Heroes');
  });

  it('should add 2 heroes hero', () => {
    const heroes = component.heroes;
    component.add('Hero 1');
    component.add('Hero 2');
    expect(heroes.length).toBe(2);
  });
});
