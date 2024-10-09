import mongoose from "mongoose";

interface ICodeReview {
  uuid: string,
  repository: string,
  owner: string,
  pull_number: number,
  base_a: string, // persiste a diferença entre o código do base e branch_a
  base_b: string, // persiste a diferença entre o código do base e branch_b
  base_merge: string // persiste a diferença entre o código do base o merge do branch_a e branch_b  
  branch_a: string, //nome do branch a
  branch_b: string // nome do branch b
}

class CodeReview implements ICodeReview {

  uuid: string;
  repository: string;
  owner: string;
  pull_number: number;
  base_a: string; // persiste a diferença entre o código do base e branch_a
  base_b: string; // persiste a diferença entre o código do base e branch_b
  base_merge: string; // persiste a diferença entre o código do base o merge do branch_a e branch_b 
  branch_a: string; //nome do branch a
  branch_b: string; // nome do branch b

  constructor(codeReview: ICodeReview) {
    this.uuid = codeReview.uuid,
      this.repository = codeReview.repository,
      this.owner = codeReview.owner,
      this.pull_number = codeReview.pull_number,
      this.base_a = codeReview.base_a,
      this.base_b = codeReview.base_b,
      this.base_merge = codeReview.base_merge,
      this.branch_a = codeReview.branch_a,
      this.branch_b = codeReview.branch_b
  }
}


// Define the schema for the analysis output

const codeReviewSchema = new mongoose.Schema({
  uuid: String,
  repository: String,
  owner: String,
  pull_number: Number,
  base_a: String, // persiste a diferença entre o código do base e branch_a
  base_b: String, // persiste a diferença entre o código do base e branch_b
  base_merge: String, // persiste a diferença entre o código do base o merge do branch_a e branch_b  
  branch_a: String, //nome do branch a
  branch_b: String // nome do branch b
});

export default mongoose.models.RevisaodeCodigo || mongoose.model("RevisaodeCodigo", codeReviewSchema);

export { CodeReview, ICodeReview };
