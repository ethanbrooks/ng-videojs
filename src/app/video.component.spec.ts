import { TestBed, async } from '@angular/core/testing';
import { VideoComponent } from './video.component';

describe('VideoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(VideoComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'golden-cock'`, () => {
    const fixture = TestBed.createComponent(VideoComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('golden-cock');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(VideoComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to golden-cock!');
  });
});
