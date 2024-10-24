import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmComponent } from './modal-confirm.component';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';

class MockMatDialogRef {
  close() {}
}

const mockDialogData = {
  name: 'Deadpool',
};

describe('ModalConfirmComponent', () => {
  let component: ModalConfirmComponent;
  let fixture: ComponentFixture<ModalConfirmComponent>;
  let dialogRef: MockMatDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModalConfirmComponent,
        MaterialModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
      ],
      providers: [
        { provide: MatDialogRef, useClass: MockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalConfirmComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heroName set to Deadpool', () => {
    expect(component.data.name).toBe('Deadpool');
  });

  it('should close the modal with false when closeModal is called', () => {
    spyOn(dialogRef, 'close');

    component.closeModal();

    expect(dialogRef.close).toHaveBeenCalled();
  });
});
