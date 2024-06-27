import { Schema, model, Types, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  type: string;
  code: string;
  email: string;
  contact: string;
  logo: string;
  is_active: boolean; 
}

const companySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique:true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
}, {
timestamps: {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}
});

const CompanyModel = model<ICompany>('Company', companySchema,'companies');

export default CompanyModel;