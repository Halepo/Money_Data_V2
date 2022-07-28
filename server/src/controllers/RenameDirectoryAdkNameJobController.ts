import { ApiCallback, ApiContext } from '../shared/api.interfaces';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { DirectoryService } from '../services';
import { logger } from '../classes/consoleLoggerClass';
import { createConn } from '@rootlib/mongo';

export class RenameDirectoryAdkNameJobController {
    public constructor(private readonly _service: DirectoryService) {
    }

    public renameDirectoryAdkNameJob: any = async (event: any, context: ApiContext, callback: ApiCallback): Promise<void> => {
        context.callbackWaitsForEmptyEventLoop = false;
        requestInterceptor(event.body);
        try {
            await createConn();
            let cronDetailsId: string = '62bd6494e79f5b65b4a5e263';
            let cronDetails: any = await this._service.findCronDetailsById(cronDetailsId);
            let collectionName: string = cronDetails.collectionName;
            let totalCount = await this._service.findCountWithFilter(collectionName);
            logger.infoData(totalCount);
            let skip: number = cronDetails.skip;
            let counter: number = cronDetails.counter;
            if (cronDetails.counter !== cronDetails.totalCount) {
                logger.infoData(skip, counter, "skip and counter");
                let docs: any = await this._service.findStudentBySkipAndLimitForDirectoryAdk(collectionName, 0);
                logger.infoData(docs, "docs");
                if (docs.length > 0) {
                    logger.infoData(docs.length);
                    for (const element of docs) {
                        logger.infoData(element);
                        await this._service.updateDirectoryAdkName(collectionName, element._id);
                        counter = counter + 1;
                    }
                    let newSkip = skip + 50;
                    /** update in crondetails */
                    await this._service.updateCronDetails(cronDetailsId, newSkip, counter);
                    logger.logData("job run successfully");
                }
            } else {
                logger.errorData("job completed");
            }
        } catch (err) {
            return ResponseBuilder.internalServerError(err, callback);
        }
    }
}
