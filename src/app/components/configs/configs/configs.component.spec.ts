import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigsComponent } from './configs.component';

describe('ConfigsComponent', () => {
  let component: ConfigsComponent;
  let fixture: ComponentFixture<ConfigsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigsComponent]
    });
    fixture = TestBed.createComponent(ConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
