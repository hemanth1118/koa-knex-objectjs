import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedUsersComponent } from './listed-users.component';

describe('UserProfileComponent', () => {
  let component: ListedUsersComponent;
  let fixture: ComponentFixture<ListedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListedUsersComponent );    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
