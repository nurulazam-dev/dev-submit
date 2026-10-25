import { IJobApplicationPayload } from "./jobApplication.type";

export interface IJobPostPayload {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location?: string | null;
  serviceType: string;
  vacancy: number;
  salaryRange?: string | null;
  deadline: Date | string;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  applications?: IJobApplicationPayload[];
}

export interface ICreateJobPostPayload {
  title: string;
  description: string;
  requirements: string;
  location?: string;
  serviceType: string;
  vacancy: number;
  salaryRange?: string | null;
  deadline: Date | string;
  isActive?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IUpdateJobPostPayload {
  id?: string;
  title?: string;
  description?: string;
  requirements?: string;
  location?: string;
  serviceType?: string;
  vacancy?: number;
  salaryRange?: string | null;
  deadline?: Date | string;
  isActive?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
