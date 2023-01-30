import { ObjectId } from 'bson';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { Service } from 'src/services';
import { Request, Response } from 'express';
import {
  deleteProfileSchema,
  editProfileSchema,
  fetchAllProfileSchema,
  registerProfileSchema,
} from '@routes/profile/schema';
import { IProfile } from 'src/interfaces/profileInterface';
import { requestValidator } from 'src/classes/requestValidator';
import moment, { now } from 'moment';

export class ProfileController {
  public constructor(private readonly _service: Service) {}

  // TODO Create new profile
  // TODO Get profiles by month, day and year (default is month), category, expense || income || transfer, with pagination
  // TODO Get profile stats by month, day and year i.e total income, total expense
  // TODO Get pending profiles and transfers
  // TODO Get profile by profile Id
  // TODO Edit profile by Id
  // ? TODO Transfer amount to another account for self or other user ??? (payment???)
  // TODO Delete profile by Id

  //register
  public registerProfile: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    let validationBody = {
      required: req.body || req.params,
      body: {
        userId: req.body.user_id,
        accountId: req.body.account_id,
        categoryId: req.body.category_id,
        type: req.body.type, //expense, income or transfer
        amount: req.body.amount,
        reason: req.body.reason,
        description: req.body.description,
        dateTime: req.body.date_time,
        // //TODO Consider adding the fallowing
        // location: req.body.location,
        // recurrence: req.body.recurrence, //boolean
        // recurrenceInterval: req.body.recurrenceInterval, //monthly, daily, annual or custom (every n days, months, hours)
        // Notification ???
        // // TODO FE : Start recurrent expense and pay per interval
        // transferUserId: req.body.transferUserId,
        // transferAccountId: req.body.transferAccountId,
        // borrowUserId: req.body.borrowUserId,
        // borrowToReturnBy: req.body.borrowToReturnBy,
      },
      schema: registerProfileSchema,
    };
    let result = requestValidator.validateRequest(res, validationBody);
    if (result) {
      let {
        userId,
        accountId,
        categoryId,
        type,
        amount,
        reason,
        description,
        dateTime,
      } = result.value;

      let created = new Date();
      if (!dateTime || moment(dateTime).isAfter(new Date())) dateTime = created;

      // TODO check if userId and accountId are valid...
      const newProfile: IProfile = {
        userId: new ObjectId(userId),
        accountId: new ObjectId(accountId),
        categoryId: new ObjectId(categoryId),
        type,
        amount,
        reason,
        description,
        created,
        dateTime,
      };
      let registeredProfile = await this._service.registerProfile(newProfile);
      logger.infoData(registeredProfile, 'registeredProfile');
      if (registeredProfile) {
        return ResponseBuilder.ok(
          {
            message: 'Successfully Registered',
            data: registeredProfile,
          },
          res
        );
      } else {
        return ResponseBuilder.configurationError(
          ErrorCode.GeneralError,
          'Error registering profile!',
          res
        );
      }
    }
  };

  //fetch all profile
  //TODO add support for filtering by date (default by month)
  public getProfile: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    let validationBody = {
      required: req.query ? true : false,
      body: {
        userId: req.query.user_id,
        accountId: req.query.account_id,
        page: req.query.page,
        pageLimit: req.query.page_limit,
        startDate: req.query.start_date,
        endDate: req.query.end_date,
        // TODO get profile by type or reason
        type: req.query.type,
        reason: req.query.reason,
      },
      schema: fetchAllProfileSchema,
    };
    let result = requestValidator.validateRequest(res, validationBody);
    if (result) {
      let { userId, accountId, page, pageLimit, startDate, endDate } =
        result.value;

      let formattedStartDate = new Date(startDate);
      let formattedEndDate = new Date(endDate);
      logger.infoData({
        startDate: formattedStartDate,
        endDate: formattedStartDate,
      });
      let allProfile = await this._service.getAllProfile(
        userId,
        accountId,
        page,
        pageLimit,
        formattedStartDate,
        formattedEndDate
      );
      logger.infoData(allProfile, 'All profile');
      if (allProfile) {
        return ResponseBuilder.ok(
          { message: 'Successfully Fetched', data: allProfile },
          res
        );
      } else {
        return ResponseBuilder.configurationError(
          ErrorCode.GeneralError,
          'Error fetching profiles!',
          res
        );
      }
    }
  };

  //Delete Profile
  public deleteProfile: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    let validationBody = {
      required: req.query ? true : false,
      body: {
        id: req.query.id,
      },
      schema: deleteProfileSchema,
    };
    let result = requestValidator.validateRequest(res, validationBody);
    if (result) {
      let id = result.value.id;
      let deleted = await this._service.deleteProfile(id);
      if (deleted) {
        return ResponseBuilder.ok(
          { message: 'Successfully Deleted', data: deleted },
          res
        );
      } else {
        return ResponseBuilder.configurationError(
          ErrorCode.GeneralError,
          'Error deleting profile!',
          res
        );
      }
    }
  };

  //Edit Profile
  public editProfile: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    let validationBody = {
      required: req.body || req.params ? true : false,
      body: {
        id: req.body.id,
        categoryId: req.body.category_id,
        amount: req.body.amount,
        reason: req.body.reason,
        description: req.body.description,
      },
      schema: editProfileSchema,
    };
    let result = requestValidator.validateRequest(res, validationBody);
    if (result) {
      let { id, categoryId, amount, reason, description } = result.value.id;
      //TODO check userId and accountId...

      // TODO check the update function ...
      const update: IProfile = {
        id: new ObjectId(id),
        categoryId: new ObjectId(categoryId),
        amount: amount,
        reason: reason,
        description: description,
      };
      let updatedProfile = await this._service.updateProfile(id, update);
      logger.infoData(updatedProfile, 'updatedProfile');
      if (updatedProfile) {
        return ResponseBuilder.ok(
          { message: 'Successfully updated', data: updatedProfile },
          res
        );
      } else {
        return ResponseBuilder.configurationError(
          ErrorCode.GeneralError,
          'Error updating profile!',
          res
        );
      }
    }
  };
}
