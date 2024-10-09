import CodeReviewModel from "../models/CodeReview";
import { CodeReview } from "../models/CodeReview";

interface CodeReviewRepository {
  getCodeReview(repo: string, owner: string, pull_number: number): Promise<CodeReview | null>;
  createCodeReview(analysisOutput: CodeReview): Promise<CodeReview>;
  updateCodeReview(newCodeReview: CodeReview): Promise<CodeReview>;
  deleteCodeReview(repo: string, owner: string, pull_number: number): Promise<void>;
  listAllAnalysisFromRepo(repo: string, owner: string): Promise<CodeReview[]>;
  listAllAnalysisFromOwner(owner: string): Promise<CodeReview[]>;
}

class CodeReviewMongoRepository implements CodeReviewRepository {
  private db = CodeReviewModel;

  async getCodeReview(repo: string, owner: string, pull_number: number): Promise<CodeReview | null> {
    const analysis = await this.db.findOne<CodeReview>(
      { repository: repo, owner, pull_number },
      { projection: { _id: 0 } }
    );

    if (!analysis) throw new Error("Analysis output not found");
    console.log("Found: ", analysis);
    return analysis;
  }

  async createCodeReview(analysisOutput: CodeReview): Promise<CodeReview> {
    await this.db.create<CodeReview>(analysisOutput);

    console.log("Created: ", analysisOutput);
    return analysisOutput;
  }

  async updateCodeReview(newCodeReview: CodeReview): Promise<CodeReview> {
    const { repository, owner, pull_number } = newCodeReview;
    const a = await this.db.updateOne({ repository, owner, pull_number }, { $set: newCodeReview });

    if (!a.acknowledged) throw new Error("Failed to update analysis output");
    console.log("Updated: ", newCodeReview);
    return newCodeReview;
  }

  async deleteCodeReview(repo: string, owner: string, pull_number: number): Promise<void> {
    await this.db.deleteOne({ repository: repo, owner, pull_number });
    console.log("Deleted: ", { repository: repo, owner, pull_number });
  }

  async listAllAnalysisFromRepo(repo: string, owner: string): Promise<CodeReview[]> {
    const analyses = await this.db.find<CodeReview>(
      { repository: repo, owner },
      { projection: { _id: 0 } }
    );
    console.log("Found: ", analyses);
    return analyses;
  }

  async listAllAnalysisFromOwner(owner: string): Promise<CodeReview[]> {
    const analyses = await this.db.find<CodeReview>({ owner }, { projection: { _id: 0 } });
    console.log("Found: ", analyses);
    return analyses;
  }
}

export { CodeReviewRepository, CodeReviewMongoRepository };
