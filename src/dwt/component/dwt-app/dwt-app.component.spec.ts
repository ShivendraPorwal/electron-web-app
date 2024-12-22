import { TestBed, async } from '@angular/core/testing';
import { DwtAppComponent } from './dwt-app.component';

describe('DwtAppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DwtAppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DwtAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'DWT + Angular Sample'`, () => {
    const fixture = TestBed.createComponent(DwtAppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('DWT + Angular Sample');
  });
});
