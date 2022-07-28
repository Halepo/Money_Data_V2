export interface ElemMatch {
  [x:string]:string
}

export interface Match {
  $match:{
    [x:string]: { [x:string]:string | ElemMatch } ;
  }

}
interface AddToSet {
  $addToSet: string
}
type Accumulator = AddToSet;
export interface Group{
  $group: {
    _id: { [x:string]:string } | string;
    [k:string]:Accumulator | Record<string, string> | string
  }
}
export interface Lookup {
  $lookup:{
    from: string;
    localField: string;
    foreignField: string;
    as: string;
  }

}

export interface Project {
  $project:{
    [x:string] : number
  }

}

export interface Unwind {
  $unwind:{
    path: string;
    includeArrayIndex?: string;
    preserveNullAndEmptyArrays?: boolean; // is false by default
  }

}

export interface ReplaceRoot {
  $replaceRoot:{
    newRoot: string | Record<string, string>;

  }
}
export interface Concat {
  $concat:string[]
}
export interface AddFields {
  $addFields:{
    [x:string]: { [x:string]:string | Concat }

  }
}

export type Aggregation = Lookup | Match | Project | Unwind | ReplaceRoot | AddFields | Group;
