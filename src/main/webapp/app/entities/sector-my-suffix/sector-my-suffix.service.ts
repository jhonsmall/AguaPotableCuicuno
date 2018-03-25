import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SectorMySuffix } from './sector-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SectorMySuffix>;

@Injectable()
export class SectorMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/sectors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/sectors';

    constructor(private http: HttpClient) { }

    create(sector: SectorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(sector);
        return this.http.post<SectorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sector: SectorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(sector);
        return this.http.put<SectorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SectorMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SectorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SectorMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SectorMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<SectorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SectorMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SectorMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SectorMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SectorMySuffix[]>): HttpResponse<SectorMySuffix[]> {
        const jsonResponse: SectorMySuffix[] = res.body;
        const body: SectorMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SectorMySuffix.
     */
    private convertItemFromServer(sector: SectorMySuffix): SectorMySuffix {
        const copy: SectorMySuffix = Object.assign({}, sector);
        return copy;
    }

    /**
     * Convert a SectorMySuffix to a JSON which can be sent to the server.
     */
    private convert(sector: SectorMySuffix): SectorMySuffix {
        const copy: SectorMySuffix = Object.assign({}, sector);
        return copy;
    }
}
