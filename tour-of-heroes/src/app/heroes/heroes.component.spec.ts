import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';

import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj<HeroService>([
      'getHeroes',
      'deleteHero',
      'addHero',
    ]);

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

    heroServiceSpy.addHero.and.returnValue(of({ id: 7, name: 'Hero 7' }));
    heroServiceSpy.deleteHero.and.returnValue(of({ id: 1, name: 'Hero 1' }));

    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: HeroService, useValue: heroServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('getHeroes', () => {
    const heroes = component.heroes;
    expect(heroes.length).toBe(6);
  });

  it('addHero', () => {
    const heroes = component.heroes;
    component.add('Hero 7');
    expect(heroes.length).toBe(7);
  });

  it('deleteHero', () => {
    const heroes = component.heroes;
    const event = new MouseEvent('click');
    component.delete({ id: 1, name: 'Hero 1' }, event);
    fixture.detectChanges();
    expect(heroes.length).toBe(6);
  });
});
