import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNoAccountComponent } from './header-no-account.component';

describe('HeaderNoAccountComponent', () => {
  let component: HeaderNoAccountComponent;
  let fixture: ComponentFixture<HeaderNoAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderNoAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNoAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
