import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGuideComponent } from './board-guide.component';

describe('BoardGuideComponent', () => {
  let component: BoardGuideComponent;
  let fixture: ComponentFixture<BoardGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
