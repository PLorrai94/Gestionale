import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSidebar } from './profile-sidebar';

describe('ProfileSidebar', () => {
  let component: ProfileSidebar;
  let fixture: ComponentFixture<ProfileSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
