import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MedidorMySuffix } from './medidor-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MedidorMySuffix>;

@Injectable()
export class MedidorMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/medidors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/medidors';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(medidor: MedidorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(medidor);
        return this.http.post<MedidorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(medidor: MedidorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(medidor);
        return this.http.put<MedidorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MedidorMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MedidorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MedidorMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MedidorMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<MedidorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MedidorMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MedidorMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MedidorMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MedidorMySuffix[]>): HttpResponse<MedidorMySuffix[]> {
        const jsonResponse: MedidorMySuffix[] = res.body;
        const body: MedidorMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MedidorMySuffix.
     */
    private convertItemFromServer(medidor: MedidorMySuffix): MedidorMySuffix {
        const copy: MedidorMySuffix = Object.assign({}, medidor);
        copy.fechaobtuvo = this.dateUtils
            .convertDateTimeFromServer(medidor.fechaobtuvo);
        copy.fecha = this.dateUtils
            .convertDateTimeFromServer(medidor.fecha);
        return copy;
    }

    /**
     * Convert a MedidorMySuffix to a JSON which can be sent to the server.
     */
    private convert(medidor: MedidorMySuffix): MedidorMySuffix {
        const copy: MedidorMySuffix = Object.assign({}, medidor);

        copy.fechaobtuvo = this.dateUtils.toDate(medidor.fechaobtuvo);

        copy.fecha = this.dateUtils.toDate(medidor.fecha);
        return copy;
    }
}
