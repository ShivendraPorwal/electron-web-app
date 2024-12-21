import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronPocComponent } from './electron-poc.component';

describe('ElectronPocComponent', () => {
  let component: ElectronPocComponent;
  let fixture: ComponentFixture<ElectronPocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronPocComponent]
    });
    fixture = TestBed.createComponent(ElectronPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
