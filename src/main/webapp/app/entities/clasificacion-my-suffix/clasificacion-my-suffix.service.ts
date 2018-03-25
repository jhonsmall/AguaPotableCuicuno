import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ClasificacionMySuffix } from './clasificacion-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ClasificacionMySuffix>;

@Injectable()
export class ClasificacionMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/clasificacions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/clasificacions';

    constructor(private http: HttpClient) { }

    create(clasificacion: ClasificacionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(clasificacion);
        return this.http.post<ClasificacionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(clasificacion: ClasificacionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(clasificacion);
        return this.http.put<ClasificacionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ClasificacionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ClasificacionMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClasificacionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClasificacionMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ClasificacionMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClasificacionMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClasificacionMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ClasificacionMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ClasificacionMySuffix[]>): HttpResponse<ClasificacionMySuffix[]> {
        const jsonResponse: ClasificacionMySuffix[] = res.body;
        const body: ClasificacionMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ClasificacionMySuffix.
     */
    private convertItemFromServer(clasificacion: ClasificacionMySuffix): ClasificacionMySuffix {
        const copy: ClasificacionMySuffix = Object.assign({}, clasificacion);
        return copy;
    }

    /**
     * Convert a ClasificacionMySuffix to a JSON which can be sent to the server.
     */
    private convert(clasificacion: ClasificacionMySuffix): ClasificacionMySuffix {
        const copy: ClasificacionMySuffix = Object.assign({}, clasificacion);
        return copy;
    }
}
