import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprojComponent } from './newproj.component';

describe('NewprojComponent', () => {
  let component: NewprojComponent;
  let fixture: ComponentFixture<NewprojComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewprojComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewprojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
