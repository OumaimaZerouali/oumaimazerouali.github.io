import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PixelBackgroundComponent} from './pixel-background.component';

describe('PixelBackgroundComponent', () => {
  let component: PixelBackgroundComponent;
  let fixture: ComponentFixture<PixelBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixelBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixelBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
