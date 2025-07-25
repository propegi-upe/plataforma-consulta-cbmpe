import { Base } from './base.entity';

export class FavoriteEntity extends Base {
  public userId: string;
  public processId: string;

  public favoriteType: string;
  public favoriteName: string;
  public creationDate: Date;

  constructor(
    userId: string,
    processId: string,
    favoriteType: string,
    favoriteName: string,
    creationDate: Date,
  ) {
    super();
    this.userId = userId;
    this.processId = processId;

    this.favoriteType = favoriteType;
    this.favoriteName = favoriteName;
    this.creationDate = creationDate;
  }
}
