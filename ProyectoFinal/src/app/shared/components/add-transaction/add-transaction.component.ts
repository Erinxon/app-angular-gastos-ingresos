import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { ActionForm } from '../../models/action-form.model';
import { Transaction } from '../../models/transaction.mode';
import { TransactionType } from '../../models/transaction-Type.model';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  form!: FormGroup;

  transactionType!: TransactionType;
  title: string = '';

  action: ActionForm = 0;
  
  constructor(
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder, private transactionBaseService: TransactionBaseService
  ) {
    this.dialogRef.disableClose = true;
    this.transactionType = this.data?.transactionType;
    this.action = this.data.action;
    this.title = this.data?.title;
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      id: [0],
      amount: [null, [Validators.required, Validators.min(1)]],
      date: [null, [Validators.required]],
      description: [null, [Validators.required]],
      type: [0],
      file: [null],
      evidence: [null],
      typeFile: [null],
      createDate: [null],
      updateDate: [null]
    })
  }

  ngOnInit(): void {}

  close(){
    this.dialogRef.close();
  }

  handleUpload(event: any){
    const allowed_types = ['image/png', 'image/jpeg', 'application/pdf'];
    if(!allowed_types.some(allowed_type => allowed_type === event.target?.files[0]?.type)){
      return;
    }
    const file = event.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.form.get('evidence')?.setValue(reader.result);
      this.form.get('typeFile')?.setValue(event.target?.files[0]?.type);
    };
  }

  save(){
    if(this.form?.invalid){
      return;
    }
    const transaction = this.form.value as Transaction;
    transaction.type = this.transactionType;
    if(this.action === ActionForm.add){
      transaction.createDate = new Date();
      transaction.updateDate = new Date();
    }
    if(this.action === ActionForm.edit){
      transaction.updateDate = new Date();
    }
    this.transactionBaseService.addTransaction(transaction).subscribe(res => {
      if(res.succeeded){
        this.dialogRef.close({
          new: true
        });
      }
    }, error => {
      console.log(error)
    })
  }

}