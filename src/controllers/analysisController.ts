import { persistenceType } from "../config";
import { CodeReviewMongoRepository, CodeReviewRepository } from "../data/CodeReviewRepository";
import { CodeReview, ICodeReview } from "../models/CodeReview";

let analysisOutputRepository: CodeReviewRepository =
  persistenceType === "mongo" ? new CodeReviewMongoRepository() : new CodeReviewMongoRepository();

interface IAnalysisController {
  getAnalysis: (repo: string, owner: string, pull_number: number) => Promise<CodeReview | null>;
  getAllAnalysisFromRepo: (repo: string, owner: string) => Promise<CodeReview[]>;
  getAllAnalysisFromOwner: (owner: string) => Promise<CodeReview[]>;
  createAnalysis: (analysis: ICodeReview) => Promise<CodeReview>;
  updateAnalysis: (analysis: ICodeReview) => Promise<CodeReview>;
  deleteAnalysis: (repo: string, owner: string, pull_number: number) => Promise<void>;
}

class AnalysisController implements IAnalysisController {
  async getAnalysis(repo: string, owner: string, pull_number: number): Promise<CodeReview | null> {
    return await analysisOutputRepository.getCodeReview(repo, owner, pull_number);
  }

  async getAllAnalysisFromRepo(repo: string, owner: string): Promise<CodeReview[]> {
    return await analysisOutputRepository.listAllAnalysisFromRepo(repo, owner);
  }

  async getAllAnalysisFromOwner(owner: string): Promise<CodeReview[]> {
    return await analysisOutputRepository.listAllAnalysisFromOwner(owner);
  }

  async createAnalysis(analysis: ICodeReview): Promise<CodeReview> {
    const newAnalysis = new CodeReview(analysis);
    return await analysisOutputRepository.createCodeReview(newAnalysis);
  }

  async updateAnalysis(analysis: ICodeReview): Promise<CodeReview> {
    const newAnalysis = new CodeReview(analysis);
    return await analysisOutputRepository.updateCodeReview(newAnalysis);
  }

  async deleteAnalysis(repo: string, owner: string, pull_number: number): Promise<void> {
    return await analysisOutputRepository.deleteCodeReview(repo, owner, pull_number);
  }
}

export default AnalysisController;
