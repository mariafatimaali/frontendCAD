import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDefiComponent } from './document-defi.component';

describe('DocumentDefiComponent', () => {
  let component: DocumentDefiComponent;
  let fixture: ComponentFixture<DocumentDefiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentDefiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
